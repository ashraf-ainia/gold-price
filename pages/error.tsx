const ErrorPage = () => {
  return <div>Error!</div>;
};

export default ErrorPage;

export async function getStaticProps() {
  return {
    props: {},
  };
}
