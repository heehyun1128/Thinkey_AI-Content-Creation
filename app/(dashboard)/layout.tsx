const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      {/*style side bar using tailwind css */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-600">
        <div>Sidebar</div>
      </div>
      <main className="md:pl-72">
        Content
      </main>
    </div>
  );
};

export default DashboardLayout;
