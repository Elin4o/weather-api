import { FaSearch, FaTimes } from "react-icons/fa"
import './SearchBar.sass'
import { ChangeEvent, } from "react"
import { optionType } from "../../types";

type Props = {
    search: string,
    options: [],
    onOptionSelect: (option: optionType) => void,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleDeleteText: () => void

}

const SearchBar = ({ search, options, onOptionSelect, handleChange, handleDeleteText }: Props): JSX.Element => {
    return (
        <>
            <div className="search-bar">
                <div className="search-radius">
                    <div className="search-wrapper">
                        <FaSearch className="search-icon" />
                        <input type="search" placeholder="Search for a city" value={search} onChange={handleChange} />
                        {search ? (
                            <FaTimes className="close-icon" onClick={handleDeleteText} />
                        ) : null}
                    </div>
                    <div className="options-wrapper">
                        {Array.isArray(options) ? options.map((option: optionType, idx: number) => {
                            return (
                                <div className="search-option" key={idx}>
                                    <button onClick={() => onOptionSelect(option)}>
                                        {option.name}, {option.country}
                                    </button>
                                </div>
                            )
                        })
                            : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchBar