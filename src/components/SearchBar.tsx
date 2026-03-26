import { useState, useEffect } from "react";

/**
 * 📦 Props:
 * parent (Explore) бізге функция береді
 * біз search мәнін соған жібереміз
 */
type Props = {
  onSearch: (value: string) => void;
};

function SearchBar({ onSearch }: Props) {
  // 🧠 User не жазып жатыр (controlled input)
  const [value, setValue] = useState("");

  // 🧠 debounce үшін бөлек state
  const [debouncedValue, setDebouncedValue] = useState(value);

  /**
   * ⏳ Debounce логика
   * user жазуды тоқтатқанша күтеміз
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 400); // 400ms

    // ❗ user қайта жазса → ескі timer өшеді
    return () => clearTimeout(timer);
  }, [value]);

  /**
   * 📤 debounced мәнді parent-қа жібереміз
   */
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search country..."
      value={value} // 🔥 controlled input
      onChange={(e) => setValue(e.target.value)} // state update
    />
  );
}

export default SearchBar;