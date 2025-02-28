import CircularProgress from './circle';

export interface StatisticsProps {
  totalPages: number;
  lastPage: number;
}

export default function Statistics({ totalPages, lastPage }: StatisticsProps) {
  const getPercent = () => {
    return (100 / totalPages) * lastPage;
  };

  return (
    <div className="flex flex-col items-center">
      <CircularProgress progress={getPercent()} />
      <div className="mt-[21px] flex items-baseline gap-[15px]">
        <span className="w-[14px] h-[14px] bg-green rounded-sm"></span>
        <div>
          <p className='text-sm mb-1'>{getPercent().toFixed(2)}%</p>
          <p className='text-lightGray text-[10px]'>{lastPage} pages read</p>
        </div>
      </div>
    </div>
  );
}
