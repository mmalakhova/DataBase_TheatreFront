import NewsCard from '../components/NewsCard';
import React from 'react';
import newsService from '../services/news.service';


function Home({

}) {

    const [news, setNews] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);

    const init = () => {
        newsService.getAll()
            .then(response => {
                console.log('News data', response.data);
                setNews(response.data);
                console.log("???", news);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    return (
        <div className="content p-40">
            <div className="align-left justify-between">
                <h1 className="text-uppercase">Новости театра</h1>
            </div>

            <div className="newsPanel d-flex flex-wrap">

            {news.map((obj) => (
                    <NewsCard
                    date = {obj.date}
                        title={obj.title}
                        descr={obj.descr}
                        imageUrl={obj.imageUrl} />
                ))}

        </div>
        </div>
    );
}

export default Home;