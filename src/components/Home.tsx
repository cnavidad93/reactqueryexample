import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { fakeFetch, ListItem, MOCK_LIST } from '../helpers/utils';
import HomeSidebar from './HomeSidebar';

import './Home.scss';

function Home() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const listQuery = useQuery('list', () => fakeFetch(MOCK_LIST).then((res) => res), {
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation(
    (newItem) => {
      return fakeFetch(newItem);
    },
    {
      onMutate: async (newItem: ListItem) => {
        // OPTIMISTIC UPDATE
        await queryClient.cancelQueries('list');

        const previousItems = queryClient.getQueryData('list');
        queryClient.setQueryData('list', (prev) => [...prev, newItem]);

        return { previousItems };
      },
      onError: (err, newItem, context) => {
        // ROLLBACK ON ERROR
        console.error(err);
        queryClient.setQueryData('list', context?.previousItems);
      },
      onSuccess: () => {
        // REFETCH QUERY
        // queryClient.invalidateQueries('list');
      },
    }
  );

  const onCreateHandler = (item: ListItem) => {
    mutation.mutate(item);
    setShowSidebar(false);
  };

  return (
    <div className="home">
      <h1>React query mock, optimistic update example</h1>

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

export default Home;
