import DockList from "@/components/DockList";
import WidgetLayout from "@/components/WidgetLayout";

const Home = () => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="min-h-full">
        <WidgetLayout></WidgetLayout>
      </div>
      <div className="sticky bottom-4">
        <DockList></DockList>
      </div>
    </div>
  );
};

export default Home;
