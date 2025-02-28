import Book from '../../../public/images/book.png';
import CustomImage from './custom-image';
import RoundedContent from './rounded-content';

export default function EmptyCategory() {
  return (
    <div className="text-center">
      <RoundedContent className="p-[25px] bg-gray border-transparent max-w-[100px] mx-auto">
        <CustomImage
          src={Book}
          alt="Book image"
          className="w-[50px] h-[50px]"
        />
      </RoundedContent>
      <p className="text-sm text-lightGray max-w-[200px] mt-[10px] mx-auto">
        <span className="text-foreground">To start training, add</span> some of
        your books{' '}
        <span className="text-foreground">To start training, add</span> or from
        the recommended ones
      </p>
    </div>
  );
}
