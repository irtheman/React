
import React, {useState} from 'react';
import SearchBox from '../components/searchBox';

const data = ['test', 'testing', 'error', 'react', 'reactjs', 'search', 'searching'];

const SearchBoxDemo = () => {
    let [elements, setElements] = useState([]);

    const filter = (query) => {
        let msg = '';
        let results = [];
        if (query) {
            results = data.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
            
            if (results && results.length === 1 && results[0] === 'error')
            {
                msg = "That is an error!";
            }
        }

        setElements(results);

        return msg;
    }

    return (
        <React.Fragment>
            <div>Things to search for: {data.join(', ')}</div>
            <p />
            <SearchBox onSearch={(q) => filter(q)} throttle={500} />
            <div>
            {
                elements && elements.map((el, index) => <div key={index.toString()}>{el}</div>)
            }
            </div>
        </React.Fragment>
    )
}

export default SearchBoxDemo;
