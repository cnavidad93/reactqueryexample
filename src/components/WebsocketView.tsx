import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { DataTable } from 'primereact/dataTable';
import { Column } from 'primereact/column';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import useQueryWebsockets from '../hooks/useQueryWebsockets';
import { ListItem } from '../helpers/utils';
import HomeSidebar from './HomeSidebar';

import './Home.scss';

function WebsocketView() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useQueryWebsockets('list', (queryKey, data, sendMessage) => {
    queryClient.setQueryData(queryKey, data);
    // queryClient.invalidateQueries(queyKey); force the API to refetch data
  });

  const listQuery = useQuery(
    'list',
    () => fetch('http://localhost:8088/items').then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const mutation = useMutation(
    (newItem: ListItem) => {
      return fetch('http://localhost:8088/items', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    {
      onSuccess: async (response, newItem) => {
        await queryClient.cancelQueries('list');
        queryClient.setQueryData('list', (prev) => [...prev, newItem]);
        // queryClient.invalidateQueries(queyKey); force the API to refetch data
      },
    }
  );

  const onCreateHandler = (item: ListItem) => {
    mutation.mutate(item);
    setShowSidebar(false);
  };

  return (
    <div className="home">
      <h1>React Query: websocket example</h1>

      <div>
        <h2>
          List of items: <button onClick={() => setShowSidebar(true)}> ADD+ </button>
        </h2>

        {listQuery.isLoading ? (
          <span>Loading...</span>
        ) : (
          <DataTable value={listQuery.data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="amount" header="Quantity"></Column>
          </DataTable>
        )}
      </div>

      <Sidebar visible={showSidebar} position="right" onHide={() => setShowSidebar(false)}>
        <HomeSidebar onCreate={onCreateHandler} />
      </Sidebar>
    </div>
  );
}

export default WebsocketView;
