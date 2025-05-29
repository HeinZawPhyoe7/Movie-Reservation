import MovieDetails from "@/components/element/movieDetails";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <MovieDetails movieId={params.id} />
    </div>
  );
};

export default Page;
