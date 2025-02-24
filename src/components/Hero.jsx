import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      {/* <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://yashmavani.tech")}
          className="black_btn"
        >
          Click me !!!
        </button>
      </nav> */}
      {/* <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient ">OpenAI GPT-4</span>
      </h1> */}

      {/* <h1 className="head_text"> */}
      {/* Summarize Articles with <br className="max-md:hidden" /> */}
      {/* <span className="orange_gradient ">Summify</span>
      </h1> */}
      <a href="/"><img src={logo} alt="sumz_logo" className="w-24 object-contain mt-20 mb-5 hover:opacity-70" /></a>
      <h1 className="head_text">
        <span className="orange_gradient typewriter">
          Summify
        </span>
      </h1>

      {/* <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2> */}
      <h2 className="desc">
        Transform lengthy articles into short, easy-to-read summaries. Let AI simplify your reading experience.
      </h2>


    </header>
  );
};

export default Hero;
