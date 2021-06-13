import Header from '../organisms/Header';
import ParkSpotListingCard from '../molecules/ParkSpotListingCard';

const MainApp = () => {
  return (
    <div className="App">
      <Header />
      <ParkSpotListingCard
        imgUrl="https://static2.mansionglobal.com/production/media/article-images/4b9af2424c2328bf3782855a87fef473/large_B3-EN112_Garage_IM_20190717123019.jpg"
        size="Example card component for Large"
        location="Mount Pleasant"
        numberAvail={2}
        dayPrice={20}
        hourPrice={3} />
    </div>
  );
};

export default MainApp;
