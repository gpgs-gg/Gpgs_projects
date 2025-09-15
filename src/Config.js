// Example: src/config.js
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export const SelectStyles = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    paddingTop: "0.25rem",
    paddingBottom: "0.10rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.50rem",
    marginTop: "0.30rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: state.isFocused ? "#fb923c" : "#f97316",
    borderRadius: "0.375rem",
    boxShadow: state.isFocused
      ? "0 0 0 2px rgba(251,146,60,0.5)"
      : "0 1px 2px rgba(0,0,0,0.05)",
    backgroundColor: "white",
    minHeight: "40px",
    "&:hover": { borderColor: "#fb923c" },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "#fb923c",
    backgroundColor: state.isSelected ? "#fb923c" : "white",
    "&:hover": { backgroundColor: "#fed7aa" }
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999
  })
};
export const CategoryOptions = [
  { value: "Others", label: "Others" },
  { value: "Rent Receipt", label: "Rent Receipt" },
  { value: "F&F Settlement", label: "F&F Settlement" },
  { value: "Rent", label: "Rent" },
  { value: "Deposit", label: "Deposit" },
  { value: "Notice", label: "Notice" },
  { value: "Agreement", label: "Agreement" },
  { value: "Handover", label: "Handover" },
  { value: "Possession", label: "Possession" },
  { value: "Shifting", label: "Shifting" },
  { value: "New Male PG", label: "New Male PG" },
  { value: "New Female PG", label: "New Female PG" },
  { value: "No Water", label: "No Water" },
  { value: "No Power", label: "No Power" },
  { value: "Short Circuit", label: "Short Circuit" },
  { value: "Fan", label: "Fan" },
  { value: "Fan Rregulator", label: "Fan Rregulator" },
  { value: "Fan Switch", label: "Fan Switch" },
  { value: "Fan Capacitor", label: "Fan Capacitor" },
  { value: "Exhaust Fan", label: "Exhaust Fan" },
  { value: "LED Tubelight", label: "LED Tubelight" },
  { value: "LED Bulb", label: "LED Bulb" },
  { value: "MSEB Meter", label: "MSEB Meter" },
  { value: "Sub Meter", label: "Sub Meter" },
  { value: "MSEB Bill", label: "MSEB Bill" },
  { value: "New Sheet", label: "New Sheet" },
  { value: "Vehicle", label: "Vehicle" },
  { value: "New Sheet", label: "New Sheet" },
  { value: "Light Switch", label: "Light Switch" },
  { value: "Three Pin Socket", label: "Three Pin Socket" },
  { value: "Extension Board", label: "Extension Board" },
  { value: "Geyser", label: "Geyser" },
  { value: "Tap Leakage", label: "Tap Leakage" },
  { value: "Water Purifier", label: "Water Purifier" },
  { value: "Washing Machine", label: "Washing Machine" },
  { value: "Fridge", label: "Fridge" },
  { value: "WiFi", label: "WiFi" },
  { value: "AC", label: "AC" },
  { value: "AC Switch", label: "AC Switch" },
  { value: "AC Remote", label: "AC Remote" },
  { value: "Water Motor Pump", label: "Water Motor Pump" },
  { value: "Main Door", label: "Main Door" },
  { value: "Main Lock", label: "Main Lock" },
  { value: "Cupboard Door", label: "Cupboard Door" },
  { value: "Cupboard Lock", label: "Cupboard Lock" },
  { value: "Bedroom Door", label: "Bedroom Door" },
  { value: "Bedroom Lock", label: "Bedroom Lock" },
  { value: "Washroom Door", label: "Washroom Door" },
  { value: "Washroom Lock", label: "Washroom Lock" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Rat", label: "Rat" },
  { value: "Pest Control", label: "Pest Control" },
];

export const DepartmentOptions = [
  { value: "Maintenance", label: "Maintenance" },
  { value: "Housekeeping", label: "Housekeeping" },
  { value: "Accounts", label: "Accounts" },
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Admin", label: "Admin" },
  { value: "Human Resource", label: "Human Resource" },
  { value: "Management", label: "Management" },

];


export const PriorityOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
  { value: "Critical", label: "Critical" },
];

export const StatusOptions = [
  { value: "Open", label: "Open" },
  { value: "Acknowledged", label: "Acknowledged" },
  { value: "In Progress", label: "In Progress" },
  { value: "On Hold", label: "On Hold" },
  { value: "Resolved", label: "Resolved" },
  { value: "Closed", label: "Closed" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Re-Open", label: "Re-Open" },
];

export const CusmoterImpactedOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

export const Managers = ["Sr. Manager", "Manager", "Team Leader", "Chairman & Group CEO", "EA to Chairman & Group CEO"]









