import { ReactComponent as StudentIcon } from '../../assets/icons/student-icon.svg';
import { ReactComponent as CourseIcon } from '../../assets/icons/course-icon.svg';
import { ReactComponent as HostelIcon } from '../../assets/icons/hostel-icon.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user-icon.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home-icon.svg';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { supabase } from '../../lib/supabase';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: '#000010',
      backgroundColor: '#F0F0F0',
    },
  ],
};
const Home = () => {

  async function fetchDashboardData() {
    try {
      const { data, error } = await supabase
        .from('your_table_name') // Replace with your table name
        .select('*'); // Or select specific columns if needed
  
      if (error) {
        console.error('Error fetching data:', error);
        return; // Handle errors gracefully
      }
  
      return data;
    } catch (error) {
      console.error('Unexpected error:', error);
      return; // Handle errors gracefully
    }
  }
  const dashboardStats = [
    {
      icon: <StudentIcon />,
      stat: '134,473',
      name: 'Total Students',
    },
    {
      icon: <CourseIcon />,
      stat: '143',
      name: 'Total Courses Available',
    },
    {
      icon: <UserIcon />,
      stat: '55',
      name: 'Total Guardians',
    },
    {
      icon: <HostelIcon />,
      stat: '700',
      name: 'Total Rooms Available',
    },
    {
      icon: <UserIcon />,
      stat: '85',
      name: 'Total Lecturers',
    },
  ];

  const statArray = [
    { icon: <HomeIcon />, name: 'Students' },
    { icon: <CourseIcon />, name: 'Courses Available' },
    { icon: <CourseIcon />, name: 'Rooms Available' },
    { icon: <CourseIcon />, name: 'Lecturers' },
  ];
  return (
    <div className='bg-[#FAFAFA] p-4 w-full h-full '>
      <div className='flex grow gap-4 '>
        {dashboardStats.map((item, index) => (
          <div key={index} className='bg-white p-3 rounded-lg w-[200px]'>
            <div className='bg-[#F0F0F0] w-10 h-10 rounded-full flex items-center justify-center p-1'>
              {item.icon}
            </div>
            <h3 className='text-3xl mt-3 font-medium'>{item.stat}</h3>
            <p className='text-sm text-[#999999] font-light mt-2'>
              {item.name}
            </p>
          </div>
        ))}
      </div>

      <div className='flex my-4'>
        <div className='bg-white p-2 space-y-3 w-[200px] border-r'>
          {statArray.map((item, index) => (
            <div
              key={index}
              className='flex gap-2 text-sm text-[#808084] hover:text-black p-2 hover:border rounded-lg cursor-pointer'
            >
              <div>{item.icon}</div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        <div className='bg-white p-4 w-[856px]'>
          <div className='bg-[#F7F7F7] p-2 flex gap-4 text-sm text-[#808080 rounded-lg'>
            <p className='hover:bg-black py-2 px-3 rounded-md hover:text-white cursor-pointer'>
              Yearly
            </p>
            <p className='hover:bg-black py-2 px-3 rounded-md hover:text-white cursor-pointer'>
              Monthly
            </p>
            <p className='hover:bg-black py-2 px-3 rounded-md hover:text-white cursor-pointer'>
              Weekly
            </p>
          </div>

          <div className='my-3'>
            <p className='text-2xl'>2,453</p>
            <p className='mt-1 text-[#999999] text-sm'>2024</p>
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
