import FormInput from "@/shared/components/FormInput";
import IconRenderer from "@/shared/components/IconRenderer";

export function EntityFields({ entity, data, setField }: any) {
  const typeOptions = {
    accounts: [
      { label: "Cash", value: "cash" },
      { label: "Bank", value: "bank" },
      { label: "E-Wallet", value: "ewallet" },
      { label: "Credit Card", value: "credit_card" },
      { label: "Investment", value: "investment" },
    ],
    pockets: [
      { label: "General", value: "general" },
      { label: "Saving", value: "saving" },
    ],
    categories: [
      { label: "Income", value: "income" },
      { label: "Expense", value: "expense" },
    ],
  };

  const colorOptions = [
    { label: "Acid Lime", value: "#c5e384" },
    { label: "Electric Violet", value: "#a78bfa" },
    { label: "Sky Blue", value: "#a3d9ff" },
    { label: "Hot Pink", value: "#f472b6" },
    { label: "Sunny Yellow", value: "#fbbf24" },
    { label: "Mandarin", value: "#fb923c" },
    { label: "Mint Green", value: "#34d399" },
    { label: "Deep Indigo", value: "#4f46e5" },
    { label: "Rose Red", value: "#f87171" },
    { label: "Cyber Teal", value: "#2dd4bf" },
  ];

  const iconLibrary = {
    accounts: [
      { label: "Wallet", value: "Wallet" },
      { label: "Bank", value: "Bank" },
      { label: "Credit Card", value: "CreditCard" },
      { label: "Money", value: "Money" },
      { label: "Coins", value: "Coins" },
      { label: "Piggy Bank", value: "PiggyBank" },
      { label: "Cash Register", value: "CashRegister" },
      { label: "Vault", value: "Vault" },
      { label: "Receipt", value: "Receipt" },
      { label: "Hand Coins", value: "HandCoins" },
      { label: "Currency Dollar", value: "CurrencyDollar" },
      { label: "Currency Circle Dollar", value: "CurrencyCircleDollar" },
      { label: "Building", value: "Buildings" },
      { label: "Device Mobile", value: "DeviceMobile" },
    ],

    pockets: [
      { label: "Folder", value: "Folder" },
      { label: "Folders", value: "Folders" },
      { label: "Archive", value: "Archive" },
      { label: "Tray", value: "Tray" },
      { label: "Tray Arrow Down", value: "TrayArrowDown" },
      { label: "Tray Arrow Up", value: "TrayArrowUp" },
      { label: "Lock", value: "Lock" },
      { label: "Lock Key", value: "LockKey" },
      { label: "Vault", value: "Vault" },
      { label: "Safe", value: "Safe" },
      { label: "Briefcase", value: "Briefcase" },
      { label: "Suitcase", value: "Suitcase" },
      { label: "Box", value: "Cube" },
      { label: "Package", value: "Package" },
    ],

    categories: [
      { label: "Shopping", value: "ShoppingBag" },
      { label: "Shopping Cart", value: "ShoppingCart" },
      { label: "Store", value: "Storefront" },
      { label: "Gift", value: "Gift" },

      { label: "Food", value: "ForkKnife" },
      { label: "Coffee", value: "Coffee" },
      { label: "Bowl Food", value: "BowlFood" },
      { label: "Pizza", value: "Pizza" },

      { label: "Transportation", value: "Car" },
      { label: "Bus", value: "Bus" },
      { label: "Train", value: "Train" },
      { label: "Motorcycle", value: "Motorcycle" },
      { label: "Airplane", value: "Airplane" },
      { label: "Gas Pump", value: "GasPump" },

      { label: "Home", value: "House" },
      { label: "Buildings", value: "Buildings" },

      { label: "Health", value: "Heartbeat" },
      { label: "Hospital", value: "Hospital" },
      { label: "First Aid", value: "FirstAidKit" },
      { label: "Medicine", value: "Pill" },

      { label: "Entertainment", value: "GameController" },
      { label: "Movie", value: "FilmSlate" },
      { label: "Music", value: "MusicNote" },
      { label: "Ticket", value: "Ticket" },

      { label: "Education", value: "GraduationCap" },
      { label: "Book", value: "BookOpen" },

      { label: "Work", value: "Briefcase" },
      { label: "Laptop", value: "Laptop" },

      { label: "Utilities", value: "Lightning" },
      { label: "Light", value: "Lightbulb" },
      { label: "Wifi", value: "WifiHigh" },
      { label: "Phone", value: "Phone" },

      { label: "Savings", value: "PiggyBank" },
      { label: "Investment", value: "ChartLineUp" },
      { label: "Target", value: "Target" },

      { label: "Travel", value: "SuitcaseRolling" },
      { label: "Map", value: "MapPin" },

      { label: "Pets", value: "Dog" },
      { label: "Family", value: "UsersThree" },

      { label: "Heart", value: "Heart" },
      { label: "Star", value: "Star" },
      { label: "Sparkle", value: "Sparkle" },
      { label: "Leaf", value: "Leaf" },
      { label: "Flower", value: "FlowerLotus" },
      { label: "Palette", value: "Palette" },
      { label: "Camera", value: "Camera" },
      { label: "Clock", value: "Clock" },
      { label: "Calendar", value: "Calendar" },
      { label: "Tag", value: "Tag" },
    ],
  };
  const currencyOptions = [
    { label: "IDR (Indonesian Rupiah)", value: "IDR" },
    { label: "USD (US Dollar)", value: "USD" },
    { label: "JPY (Japanese Yen)", value: "JPY" },
    { label: "EUR (Euro)", value: "EUR" },
  ];

  const currentOptions = typeOptions[entity as keyof typeof typeOptions];
  const currentIconOptions =
    iconLibrary[entity as keyof typeof iconLibrary] || [];
  const hasIcon =
    entity === "accounts" || entity === "categories" || entity === "pockets";
  return (
    <>
      {hasIcon && (
        <div className="flex flex-col items-center">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            style={{ backgroundColor: data.color || "#e2e8f0" }}
          >
            <IconRenderer name={data.iconSlug || "Circle"} size={42} />
          </div>

          <p className="mt-3 text-center text-sm font-bold uppercase tracking-wider text-slate-700">
            {data.name?.trim() || "New Entity"}
          </p>
        </div>
      )}

      <FormInput
        label="Name"
        value={data.name || ""}
        onChange={(val) => setField("name", val)}
      />

      {hasIcon && (
        <FormInput
          label="Icon"
          value={data.iconSlug || ""}
          onChange={(val) => setField("iconSlug", val)}
          options={currentIconOptions}
          searchable
        />
      )}

      <FormInput
        label="Background Color"
        value={data.color || ""}
        onChange={(val) => setField("color", val)}
        options={colorOptions}
        dropdownType="select"
        placeholder="Choose a color"
      />
      {entity === "accounts" && (
        <FormInput
          label="Currency"
          value={data.currency || "IDR"} // Menggunakan data dari props
          onChange={(val) => setField("currency", val)} // Konsisten pakai setField
          options={currencyOptions}
          placeholder="Select currency"
        />
      )}
      {currentOptions && (
        <FormInput
          label="Type"
          value={data.type || ""}
          onChange={(val) => setField("type", val)}
          options={currentOptions}
          dropdownType="select"
          searchable={false}
          placeholder="Select type"
        />
      )}
    </>
  );
}
