'use client';

// import { useSet } from 'react-use';

import { FilterCheckbox, FilterChecboxProps } from './filter-checkbox';
import { Input } from '../ui/input';
import { FC, useState } from 'react';
import { Skeleton } from '../ui';
import { useSet } from 'react-use';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    name?: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    className?: string;
    loading?: boolean;
    onClickCheckbox?: (values: string) => void;
    defaultValue?: string[];
    selectedIds?: Set<string>
}

export const CheckboxFiltersGroup: FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Поиск...',
    className,
    loading,
    selectedIds,
    onClickCheckbox,
    defaultValue,
    name
}) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('')

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    if (loading) {
        return (
            <div>
                <p className='font-bold mb-3'>
                    {title}
                </p>
                {...Array(limit).fill(0).map((_, index) => (
                    <Skeleton key={index} className='h-6 mb-3  w-full rounded-[8px]' />
                ))}
            </div>
        )
    }

    const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())) : (defaultItems || items).slice(0, limit);

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input onChange={onSearch} placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item) => (
                    <FilterCheckbox
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        checked={selectedIds?.has(item.value)}
                        key={String(item.value)}
                        value={item.value}
                        text={item.text}
                        name={item.name || name}
                        endAdornment={item.endAdornment}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};
