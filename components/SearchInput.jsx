import { LiaSearchSolid } from "react-icons/lia";

export default function SearchInput({ value, onChange }) {
  return (
    <div className="search-input">
      <LiaSearchSolid color="#dbdbdb" size={20} />
      <input
        type="text"
        placeholder="Type here to search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
