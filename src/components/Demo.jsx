import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [deepseekloader, setDeepSeekLoader] = useState(false);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleLoadDeepSeekArticle = () => {
    // Function to set the input box's placeholder and value to a specific URL
    setArticle({
      ...article,
      url: "https://www.bbc.com/news/articles/c5yv5976z9po",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (article.url === "https://www.bbc.com/news/articles/c5yv5976z9po") {
      // Use predefined summary if URL matches
      const predefinedSummary =
        "DeepSeek, a Chinese AI startup, has stunned the world with the release of its latest model, DeepSeek R1, which it claims rivals the capabilities of OpenAI's ChatGPT. DeepSeek's popularity and potential have rattled investors, causing billions of dollars in losses for tech giants like Nvidia. The app's performance and lower cost, achieved through innovative use of less powerful but more efficient chips, have made it a threat to the dominance of American AI firms. DeepSeek was founded in 2023 by Liang Wenfeng, a finance-oriented entrepreneur who has a background in quantitative trading. Unlike many American AI founders, Liang sees DeepSeek as a way for China to become an innovator in the field, rather than just a follower. The app's success has drawn scrutiny from global leaders, with Australia banning it on government devices and Italy ordering a halt to data processing due to privacy concerns. DeepSeek's achievements have shaken the belief that bigger budgets and top-tier chips are the only paths to advancing AI. Its apparent ability to develop cutting-edge models with limited resources has raised questions about the future of high-performance chips and the dominance of American firms in the AI market. In China, DeepSeek's success is being celebrated as a testament to the country's growing technological prowess and self-reliance, though this sentiment may also lead to increased tech isolationism.";

      // Activate loader
      setDeepSeekLoader(true);
      setTimeout(() => {
        setDeepSeekLoader(false); // Turn off loader after 1 second
      }, 800);

      const newArticle = { ...article, summary: predefinedSummary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      //setAllArticles(updatedAllArticles);
      //localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    } else {
      // Fetch summary from API if URL is different
      const { data } = await getSummary({ articleUrl: article.url });

      if (data?.summary) {
        const newArticle = { ...article, summary: data.summary };
        const updatedAllArticles = [newArticle, ...allArticles];
        setArticle(newArticle);
        setAllArticles(updatedAllArticles);
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>
        <div className="max-w-full flex justify-center items-center">
          <button
            onClick={handleLoadDeepSeekArticle}
            className="bg-gradient-to-r opacity-80 from-amber-500 to-orange-600 text-white font-semibold font-satoshi py-1.5 px-4 mt-3 rounded-2xl text-sm hover:from-sky-600 hover:to-teal-500"
          >
            Summarize a latest DeepSeek article by BBC
          </button>
          {/* <button
            onClick={handleLoadDeepSeekArticle}
            className="desc22 font-satoshi font-bold text-gray-600 text-xl mt-3 mb-2"
          >
            Summarize a latest DeepSeek article by BBC
          </button> */}
        </div>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.length > 0 && (
            <h2 className="font-satoshi font-bold text-gray-600 text-xl mt-8 mb-2">
              Your <span className="blue_gradient">History</span>
            </h2>
          )}
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching || deepseekloader ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen... Try Another URL
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
