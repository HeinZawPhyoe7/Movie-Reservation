import Booking from "@/components/element/Booking";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <div>
        <Booking movieId={id} />
      </div>
    </div>
  );
};

export default Page;
