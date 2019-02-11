/**
 * Created by svitlanamishchuk on 2/11/19.
 */
import React from 'react';
import './SearchBar.css';

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // Create the list items to display the sort options
    renderSortByOptions() {
        return Object.keys(sortByOptions).map( sortByOption => {
           let sortByOptionValue = sortByOptions[sortByOption];
            return <li key={sortByOptionValue}
                       className={this.getSortByClass(sortByOptionValue)}
                        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                {sortByOption}
                </li>
        });
    }

    // get CSS class for chosen active sort
    getSortByClass(sortByOption) {
        return this.state.sortBy === sortByOption ? 'active' : '';
    }

    // handle chosen sort option and set it to current state
    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption });
    }

    // handle change value in term input and change state
    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }

    // handle change value in term input and change state
    handleLocationChange(e) {
        this.setState({ location: e.target.value });
    }

    // handle on click search button
    handleSearch(e) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        e.preventDefault();
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>{this.renderSortByOptions()}</ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange} />
                    <input placeholder="Where?" onChange={this.handleLocationChange} />
                </div>
                <div className="SearchBar-submit" onClick={this.handleSearch}>
                    <a>Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar;