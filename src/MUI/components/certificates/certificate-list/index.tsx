import { useFetchCertificates } from '@/hooks/queries';
import { FC, useState } from 'react';
import { errorCatch } from '@/http/error';
import { CertificateListItem } from './certificate-list-item/';
import { TField, getSortData } from '@/utils/sort/get-sort-data';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ICertificate } from '@/models/certificate/ICertificate';
import { FormControlLabel, FormGroup, IconButton, Switch } from '@mui/material';
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from 'lucide-react';

const CertificateList: FC = () => {
  const { data: list, error, isLoading, isSuccess } = useFetchCertificates();
  const [sortField, setSortField] = useState<TField>('createdAt');
  const [sortType, setSortType] = useState<'asc' | 'desc'>('desc');
  const [checked, setChecked] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: SelectChangeEvent<any>) => {
    setSortField(event.target.value);
  };

  const handleActiveSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>{errorCatch(error)}</div>;
  }

  if (!list || !list?.length) {
    return <div className='text-blue-700 text-center'>НЕТ ДАННЫХ</div>;
  }
  return (
    <>
      <div className='mb-2 flex justify-end gap-2'>
        <FormGroup>
          <FormControlLabel control={<Switch checked={checked} onChange={handleActiveSwitch} inputProps={{ 'aria-label': 'controlled' }} />} label='Не активные' />
        </FormGroup>
        <FormControl sx={{ minWidth: 150 }} size='small'>
          <InputLabel id='sort-id-for-label'>Сортировать по:</InputLabel>
          <Select labelId='sort-id-for-label' value={sortField} label='Сортировать по:' onChange={handleChange}>
            <MenuItem value={'createdAt'}>Дате</MenuItem>
            <MenuItem value={'totalPrice'}>Стоимости</MenuItem>
            <MenuItem value={'title'}>Названию</MenuItem>
          </Select>
        </FormControl>
        <FormControl size='small'>
          <IconButton aria-label='sort' size='small' color='primary' onClick={() => (sortType === 'asc' ? setSortType('desc') : setSortType('asc'))}>
            {sortType === 'asc' ? <ArrowDownNarrowWide size={26} /> : <ArrowDownWideNarrow size={26} />}
          </IconButton>
        </FormControl>
      </div>

      <div role='list' className='flex flex-col'>
        {list &&
          getSortData(
            list.filter((item: ICertificate) => {
              return checked ? true : item.isActivated === true;
            }),
            { field: sortField, order: sortType },
          ).map((item) => <CertificateListItem key={item.id} item={item} />)}
      </div>
    </>
  );
};

export { CertificateList };
