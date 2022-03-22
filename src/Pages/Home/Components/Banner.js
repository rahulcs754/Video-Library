export const Banner = () => {
  return (
    <div className="home_banner banner_img">
      <h1 className="f-xxl">Welcome ESW</h1>
      <p className="bg-primary">
        If you are stuck any coding problem then you are write place to solve
        your problem.
      </p>
      <p className="bg-primary">
        Here we will provide you solution of all coding problem
      </p>
      <svg className="arrows">
        <path className="a1" d="M0 0 L30 32 L60 0"></path>
        <path className="a2" d="M0 20 L30 52 L60 20"></path>
        <path className="a3" d="M0 40 L30 72 L60 40"></path>
      </svg>
    </div>
  );
};
