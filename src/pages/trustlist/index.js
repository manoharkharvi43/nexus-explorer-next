import Table from 'components/Table/Table';
import { useQuery } from 'react-query';
import axios from 'axios';
import styles from './trustlist.module.scss';
import Loader from 'components/atoms/NE_Loader';
import { intlNum } from 'utils/converter';
import CopyText from 'components/atoms/CopyText/CopyText';

export default function Trustlist() {
  const { isLoading, data, error } = useQuery(
    'trustlist',
    async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/register/list/trust`,
        {
          params: {
            // limit: 100,
            sort: 'trust',
            order: 'desc',
          },
        }
      );
      return res.data;
    },
    {
      // refetchOnWindowFocus: false,
      // enable: false,
    }
  );

  const columns = [
    {
      Header: '#ID',
      Cell: (props) => <div>{parseInt(props.cell.row.id) + 1}</div>,
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ value }) => <CopyText value={value} />,
    },
    {
      Header: 'Balance',
      accessor: 'balance',
      Cell: (props) => intlNum(props.value) + ' NXS',
    },
    {
      Header: 'Stake',
      accessor: 'stake',
      Cell: (props) => intlNum(props.value) + ' NXS',
    },
    {
      Header: 'Stake Rate',
      accessor: 'rate',
    },
    {
      Header: 'Trust',
      accessor: 'trust',
      Cell: (props) => intlNum(props.value),
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '200px',
          margin: 'auto',
        }}>
        <Loader type="circle" size="5rem" />
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  if (data) {
    const newData = data.result.map((item, index) => ({
      key: index,
      ...item,
      stake: item.stake,
      balance: item.balance,
    }));
    return (
      <div className={styles.page} style={{ marginBottom: '1rem' }}>
        <Table columns={columns} data={newData} />
      </div>
    );
  }
}
