import React, { ReactElement, ReactNode, useState } from 'react';
import { Combobox } from '@headlessui/react';

import './autocomplete.scss';

type AutoCompleteProps = {
  value: any;
  options: any[];
  minLength: number;
  emptyMessage: string;
  loading: boolean;
  placeholder: string;
  displayValue?(item: any): string;
  optionTemplate?(option: any): ReactElement;
  onChange(query: string, { valid }: { valid: boolean }): void;
  onSelect(item: any): void;
};

const defaultDisplayValue = (item: any): string => item?.name ?? '';

const AutoComplete = ({
  value,
  options = [],
  minLength,
  emptyMessage,
  loading = false,
  placeholder,
  displayValue = defaultDisplayValue,
  optionTemplate,
  onChange,
  onSelect,
}: AutoCompleteProps) => {
  const [query, setQuery] = useState<string>('');
  const isValidLength = minLength ? query.length >= minLength : true;
  const notFound = isValidLength && emptyMessage && options.length === 0 && !loading;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value;
    setQuery(q);
    onChange?.(q, { valid: minLength ? q.length >= minLength : true });
  };

  return (
    <Combobox defaultValue={value} onChange={onSelect}>
      <div className="auto-complete">
        <div className="input-wrapper">
          <Combobox.Input
            className="input"
            placeholder={placeholder}
            displayValue={displayValue}
            onChange={onChangeHandler}
          />
          {loading && (
            <Combobox.Button className="loading-button">
              <i className="p-autocomplete-loader pi pi-spinner pi-spin"></i>
            </Combobox.Button>
          )}
        </div>
        <Combobox.Options className="options">
          {notFound ? (
            <div className="option empty">{emptyMessage}</div>
          ) : (
            options.map((option, i) => (
              <Combobox.Option
                key={option.id ?? i}
                className={({ active }) => `option ${active ? 'active' : ''}`}
                value={option}
              >
                {optionTemplate ? optionTemplate(option) : <span>{displayValue(option)}</span>}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default AutoComplete;
