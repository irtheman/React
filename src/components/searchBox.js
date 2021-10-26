import React from 'react';
import PropTypes from 'prop-types';
import '../sass/searchBox.scss';
import LoaderImg from '../assets/loading.gif';
import SearchImg from '../assets/search.png';

class SearchBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			loading: false,
			message: ''
		};
	}

	handleOnInputChange = (event) => {
		const query = event.target.value;
		if (!query) {
			this.setState({query, loading: false, message: ''});
		} else {
			this.setState({query, loading: true, message: ''}, () => {
                let error = '';

                if (this._throttleTimeout) {
                    clearTimeout(this._throttleTimeout)
                }
          
                this._throttleTimeout = setTimeout(
                  () => {
                      error = this.props.onSearch(query);
                      console.log('result', error);
                      this.setState({loading: false, message: error});
                    },
                  this.props.throttle
                )
			});
		}
	};

    clear = () => {
        this.setState({query: '', loading: true, message: ''}, () => {
            const error = this.props.onSearch('');
            this.setState({loading: false, message: error});
        });
    };

	render() {
		const {query, loading, message} = this.state;

		return (
			<div className="search-container">
                <label className="search-label" htmlFor="search-input">
                    <input
                        data-testid="search-query" 
                        type="text"
                        name="query"
                        value={query}
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleOnInputChange}
                    />
                    <img
                        data-testid="search-image"
                        className="search-icon"
                        src={SearchImg}
                        alt="Search"
                        onClick={this.clear}
                    />
                    <img 
                        src={LoaderImg} 
                        className={`search-loading ${loading ? 'search-show' : 'search-hide'}`} 
                        alt="Loader"
                    />
                </label>

                {message && <p data-testid="search-error" className="search-message">{message}</p>}
            </div>
		)
	}
}

SearchBox.defaultProps = {
    onSearch () {},
    throttle: 0
}
  
SearchBox.propTypes = {
    onSearch: PropTypes.func,
    throttle: PropTypes.number,
}

export default SearchBox;