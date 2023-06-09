import React from 'react';
import { useState } from 'react';
import Input from '../../../../common/Input/Input';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useSelector } from 'react-redux';
import { FilterPropsI, LoadsState, TrucksState } from '../../Model';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import {
	filterByNameText,
	menuItemsLoads,
	menuItemsTrucks,
	withoutSortText,
} from '../../../../constants';
import {
	useChangesStylesIsFocused,
	useSortCards,
} from '../../../../hooks/use-hooks';

const SearchBar = ({ filterCards }: FilterPropsI) => {
	const [name, setName] = useState('');
	const [typeValue, setTypeValue] = useState('');
	const user: any = useSelector((state: any) => state.user.role);
	let cards: any;
	let menuItems;
	let trucks = useSelector((state: TrucksState) => state.truck.trucks);
	const { t } = useTranslation();
	let loads = useSelector((state: LoadsState) => state.load.loads);
	user === 'DRIVER' ? (cards = trucks) : (cards = loads);
	const sort = useSortCards();
	const changeStyleFocus = useChangesStylesIsFocused(false);

	user === 'DRIVER'
		? (menuItems = menuItemsTrucks)
		: (menuItems = menuItemsLoads);
	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
		filterCards(event.target.value);
	};

	const commonSort = (e: any) => {
		setTypeValue(e.target.value);
		let selectValue = e.target.value
			.split(' ')
			.filter((item: any) => item !== 'Asc' && item !== 'Desc')
			.join(' ');
		let newTrucks;
		let newLoads;
		user === 'DRIVER' ? (newTrucks = [...cards]) : (newLoads = [...cards]);
		if (user === 'DRIVER') {
			e.target.value.slice(-3) === 'Asc'
				? sort.sortCards(newTrucks, [selectValue, 'asc'])
				: sort.sortCards(newTrucks, [selectValue, 'desc']);
		} else if (user === 'SHIPPER') {
			e.target.value.slice(-3) === 'Asc'
				? sort.sortCards(newLoads, [selectValue, 'asc'])
				: sort.sortCards(newLoads, [selectValue, 'desc']);
		}
	};

	return (
		<>
			<div className='filter-container'>
				<div
					className='icon-filter-container'
					style={changeStyleFocus.stylefilterContainer}
				>
					<FontAwesomeIcon icon={faFilter} className='icon-filter' />
				</div>
				<Input
					placeholder={t(filterByNameText)}
					value={name}
					type='text'
					onChange={handleNameChange}
					style={changeStyleFocus.styleSearch}
					onBlur={changeStyleFocus.onBlur}
					onFocus={changeStyleFocus.onFocus}
				/>
			</div>
			<div className='filter-sort-container'>
				<FormControl
					sx={{
						m: 1,
						width: 160,
						margin: 0,
						height: 'inherit',
						'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
							{
								borderColor: 'rgb(219, 165, 17)',
							},

						'& .MuiSvgIcon-root': {
							color: '#e7effb',
						},
						'& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon': {
							color: 'rgb(219, 165, 17)',
						},
					}}
					size='small'
				>
					<Select
						value={typeValue}
						sx={{
							'.MuiOutlinedInput-notchedOutline': {
								borderColor: '#bbcfe7',
							},
							'&:hover': {
								'&& fieldset': {
									borderColor: 'rgb(219, 165, 17)',
								},
							},
						}}
						onChange={commonSort}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
						data-testid='select'
					>
						<MenuItem value=''>
							<span data-testid='without-sort'>{t(withoutSortText)}</span>
						</MenuItem>
						{menuItems.map((item, i) => {
							return (
								<MenuItem
									key={i}
									value={item}
									onMouseEnter={(e: any) =>
										(e.target.style.backgroundColor = '#e7effb')
									}
									onMouseLeave={(e: any) =>
										(e.target.style.backgroundColor = '#ffffff')
									}
								>
									{item}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</div>
		</>
	);
};

export default SearchBar;
