import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaSnowflake,
  FaUsers,
  FaBath,
  FaHome,
} from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";


const BedsAvilable = () => {
  const [data, setData] = useState([]);
  const [filterTotal, setFilterTotal] = useState("");
  const [genderFilter, setGenderFilter] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [popup, setPopup] = useState(null);
  const [sortByVacatingDate, setSortByVacatingDate] = useState(false);

  const [dynamicFilters, setDynamicFilters] = useState({
    location: [],
    ac: [],
    sharing: [],
    bathroom: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          // `http://localhost:3000/Beds-status`
          "https://gpgs-main-server.vercel.app/api/Beds-status"
        );
        if (res.data.success) {
          const raw = res.data.data;
          setData(raw);
          setShowContent(true);

          const extractUnique = (field) =>
            [...new Set(raw.map((d) => d[field]).filter(Boolean))];

          setDynamicFilters({
            location: extractUnique("Location"),
            ac: extractUnique("AC / Non AC"),
            sharing: extractUnique("Sharing Type"),
            bathroom: extractUnique("Attached Bathroom"),
          });
        }
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFilter = (label) => {
    setActiveFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const clearFilters = () => {
    setGenderFilter(null);
    setActiveFilters([]);
  };

  const FILTER_FIELDS = {};
  dynamicFilters.ac.forEach((val) => (FILTER_FIELDS[val] = { key: "AC / Non AC", value: val }));
  dynamicFilters.sharing.forEach((val) => (FILTER_FIELDS[val] = { key: "Sharing Type", value: val }));
  dynamicFilters.location.forEach((val) => (FILTER_FIELDS[val] = { key: "Location", value: val }));
  dynamicFilters.bathroom.forEach((val) => (FILTER_FIELDS[val] = { key: "Attached Bathroom", value: val }));

  const filteredData = data
    .filter((item) => {
      if (item["Bed Available"]?.toLowerCase() !== "yes") return false;
      if (
        genderFilter &&
        item["Male / Female"]?.toLowerCase() !== genderFilter.toLowerCase()
      )
        return false;

      const groupedFilters = {};
      activeFilters.forEach((label) => {
        const field = FILTER_FIELDS[label]?.key;
        const value = FILTER_FIELDS[label]?.value;
        if (field && value) {
          groupedFilters[field] = [...(groupedFilters[field] || []), value];
        }
      });

      return Object.entries(groupedFilters).every(([field, values]) => {
        const itemValue = item[field]?.toString().toLowerCase();
        return values.some((val) => itemValue === val.toLowerCase());
      });
    })
    .sort((a, b) => {
      if (!sortByVacatingDate) return 0;
      const dateA = new Date(a["Client Vacating Date"]);
      const dateB = new Date(b["Client Vacating Date"]);
      return dateA - dateB;
    });

  useEffect(() => {
    setFilterTotal(filteredData.length);
  }, [filteredData]);

  const renderCheckboxList = (options) => (
    <div className="space-y-2">
      <div className="flex gap-3 mb-2">
        <button
          onClick={() =>
            setActiveFilters((prev) => [...new Set([...prev, ...options])])
          }
          className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
        >
          Select All
        </button>
        <button
          onClick={() =>
            setActiveFilters((prev) => prev.filter((f) => !options.includes(f)))
          }
          className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
        >
          Clear All
        </button>
      </div>
      {options.map((label) => (
        <label key={label} className="block text-sm">
          <input
            type="checkbox"
            checked={activeFilters.includes(label)}
            onChange={() => toggleFilter(label)}
          />
          <span className="ml-2">{label}</span>
        </label>
      ))}
    </div>
  );

  const renderPopupContent = () => {
    switch (popup) {
      case "gender":
        return (
          <div className="space-y-2 text-sm">
            <label className="block">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={genderFilter === "Male"}
                onChange={() => setGenderFilter("Male")}
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="block">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={genderFilter === "Female"}
                onChange={() => setGenderFilter("Female")}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        );
      case "location":
        return renderCheckboxList(dynamicFilters.location);
      case "ac":
        return renderCheckboxList(dynamicFilters.ac);
      case "sharing":
        return renderCheckboxList(dynamicFilters.sharing);
      case "bathroom":
        return renderCheckboxList(dynamicFilters.bathroom);
      default:
        return null;
    }
  };

  const filterButtons = [
    { id: "gender", icon: <FaUsers />, label: "Gender" },
    { id: "location", icon: <FaMapMarkerAlt />, label: "Location" },
    { id: "ac", icon: <FaSnowflake />, label: "AC / Non AC" },
    { id: "sharing", icon: <FaHome />, label: "Sharing Type" },
    { id: "bathroom", icon: <FaBath />, label: "Attached Bathroom" },
  ];

  if (loading)
    return (
      <p className="text-center flex justify-center  items-center text-orange-200 min-h-screen text-4xl">
        <img className="w-[300px]" src="https://png.pngtree.com/png-clipart/20230413/original/pngtree-jai-shri-ram-text-with-hindu-flag-design-png-image_9050809.png" alt="" /> Loading.....
      </p>
    );

  return (
    
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="sticky top-0 z-5 ">
        <div className="relative flex items-center justify-center ">
          <div className="absolute  p-2 left-0 w-[250px]">
            {/* <img
              src="https://gpgs.in/wp-content/themes/paying_guest/images/logo.png"
              alt="Logo"
            /> */}
          </div>
        </div>
    
      
      </div>

         {showContent && (
          <div className="grid grid-cols-2 mt-[100px] sm:flex sm:flex-wrap justify-center  gap-2">
            {filterButtons.map((btn) => {
              let selectedOptions = [];
              if (btn.id === "gender" && genderFilter) {
                selectedOptions = [genderFilter];
              } else {
                selectedOptions = activeFilters.filter(
                  (label) => FILTER_FIELDS[label]?.key === btn.label
                );
              }

              return (
                <div
                  key={btn.id}
                  className="relative w-full sm:w-auto"
                  onMouseEnter={() => setPopup(btn.id)}
                  onMouseLeave={() => setPopup(null)}
                >
                  <button className="flex items-center mt-5 justify-between w-full sm:justify-center gap-2 px-4 py-1 border border-orange-500 text-orange-600 bg-white rounded-xl hover:bg-orange-50 shadow-sm transition-all">
                    {btn.icon}
                    <span className="font-medium">{btn.label}</span>
                  </button>

                  {popup === btn.id && (
                    <div className="absolute top-6.5 left-0 z-50 bg-white border border-orange-300 shadow-lg rounded-xl p-4 w-64 mt-1">
                      <h2 className="text-sm text-orange-500 font-bold mb-3 capitalize">
                        {btn.label} Filter
                      </h2>
                      {renderPopupContent()}
                    </div>
                  )}

                  {/* {selectedOptions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1 text-xs">
                      {selectedOptions.map((opt) => (
                        <span
                          key={opt}
                          className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center gap-1"
                        >
                          {opt}
                     
                        </span>
                      ))}
                    </div>
                  )} */}
                </div>
              );
            })}


            {activeFilters.length > 0 && (
              <button className="flex items-center mt-5 bg-orange-100 justify-between h-8 sm:justify-center gap-2 px-4 py-1 border border-orange-500 text-orange-600  rounded-xl hover:bg-orange-50 shadow-sm transition-all">
                {/* {btn.icon} */}
                <span onClick={clearFilters}
                  className="font-medium flex items-center gap-2 ">
                  <AiOutlineClear /> Clear Filters
                  {/* {btn.label} */}


                </span>
              </button>

            )}

            <div className="flex items-center justify-end mt-5 mb-2 gap-2">
              <button
                onClick={() => setSortByVacatingDate((prev) => !prev)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all ${sortByVacatingDate ? "bg-orange-500" : "bg-gray-300"
                  }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${sortByVacatingDate ? "translate-x-6" : "translate-x-0"
                    }`}
                />
              </button>
              <label className="text-lg font-medium  text-orange-600">
                Sort By CVD
              </label>
            </div>
          </div>
        )}

      <div className="max-w-full mx-auto ">
        {filteredData.length === 0 ? (
          <p className="text-gray-500 text-center flex justify-center items-center py-10">
            {/* No records found for selected filters. */}
            <img src="https://ispperio.com/ASPX_Images/not_found.jpg" alt="" />
          </p>
        ) : (
          <>
     
            {filterTotal > 0 && (
              <div className="text-end text-sm text-gray-600 mr-8 mb-1">
                Showing{" "}
                <span className="font-semibold text-orange-600">
                  {filterTotal}
                </span>{" "}
                Bed(s)
              </div>
            )}
            <div className="overflow-auto max-h-screen  border border-gray-200">
              <table className="min-w-[1000px] w-full text-sm text-left text-gray-700">
                <thead className="sticky top-0 bg-orange-300 z-10 shadow-md font-bold text-gray-800 text-base">
                  <tr>
                    {Object.keys(filteredData[0] || {}).map((key, idx) => (
                      <th
                        key={key}
                        className={`px-2 py-2 border-b font-bold border-gray-300 whitespace-nowrap  ${idx === 0
                            ? "sticky left-0 z-20 bg-orange-300"
                            : idx === 1
                              ? "sticky left-[30px] z-20 bg-orange-300 "
                              : ""
                          }`}
                      >
                        {key === "1" ? "Sr.No" : key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white hover:bg-gray-100 transition-all border-b border-gray-200"
                    >
                      {Object.keys(filteredData[0] || {}).map((key, idx) => (
                        <td
                          key={idx}
                          className={`px-2 py-2 text-[15px] align-top whitespace-nowrap ${idx === 0
                              ? "sticky left-0  font-bold bg-orange-300"
                              : idx === 1
                                ? "sticky left-[30px] font-bold bg-orange-300"
                                : ""
                            }`}
                        // style={{ minWidth: "100px" }}
                        >
                          {item[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  
  );
};

export default BedsAvilable;












