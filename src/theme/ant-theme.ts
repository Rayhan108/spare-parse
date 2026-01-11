


// src/theme/ant-theme.ts
import type { ThemeConfig } from "antd";

// ✅ Your ORIGINAL Light Mode Theme - UNCHANGED
export const mainTheme: ThemeConfig = {
  token: {
    colorPrimary: "#f56100",
  },
  components: {
    Select: {
      activeBorderColor: "rgb(245,97,0)",
      activeOutlineColor: "rgb(245,97,0)",
      hoverBorderColor: "rgb(245,97,0)",
      optionSelectedBg: "rgba(245,98,0,0.22)",
      colorPrimary: "rgb(245,97,0)",
      borderRadius: 0,
      borderRadiusLG: 0,
      borderRadiusSM: 0,
      borderRadiusXS: 0,
      controlOutlineWidth: 0,
      colorBorder: "rgb(223,88,0)",
      controlHeight: 44,
    },
    Input: {
      activeBorderColor: "rgb(245,97,0)",
      hoverBorderColor: "rgb(245,97,0)",
      colorBorder: "rgb(245,97,0)",
      borderRadius: 0,
      controlHeight: 40,
    },
    Pagination: {
      colorPrimary: "rgb(223,88,0)",
      colorPrimaryBorder: "rgb(223,88,0)",
      colorPrimaryHover: "rgb(223,88,0)",
    },
  },
};




export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#f56100",
    colorBgContainer: "#1f2937",
    colorBgElevated: "#374151",
    colorBgLayout: "#111827",
    colorBgSpotlight: "#374151",
    colorBorder: "#4B5563",
    colorBorderSecondary: "#374151",
    colorText: "#ffffff",
    colorTextSecondary: "#9CA3AF",
    colorTextTertiary: "#6B7280",
    colorTextQuaternary: "#4B5563",
  },
  components: {

    Input: {
      activeBorderColor: "rgb(245,97,0)",
      hoverBorderColor: "#6B7280",
      colorBorder: "#4B5563",
      borderRadius: 0,
      controlHeight: 40,
      colorBgContainer: "#24292E", 
      colorText: "#ffffff",
      colorTextPlaceholder: "#9CA3AF",
    },

  
    Select: {
      activeBorderColor: "rgb(245,97,0)",
      activeOutlineColor: "rgb(245,97,0)",
      hoverBorderColor: "rgb(245,97,0)",
      optionSelectedBg: "#4B5563",
      colorPrimary: "rgb(245,97,0)",
      borderRadius: 0,
      borderRadiusLG: 0,
      borderRadiusSM: 0,
      borderRadiusXS: 0,
      controlOutlineWidth: 0,
      colorBorder: "#4B5563",
      controlHeight: 44,
      colorBgContainer: "#24292E",  // ✅ Changed
      colorBgElevated: "#24292E",   // ✅ Changed
      colorText: "#ffffff",
      colorTextPlaceholder: "#9CA3AF",
      controlItemBgActive: "#4B5563",
      controlItemBgHover: "#4B5563",
      optionActiveBg: "#374151",
      selectorBg: "#24292E",        // ✅ Changed
    },

    // ✅ DatePicker Component - Updated bg color
    DatePicker: {
      colorBgContainer: "#24292E",  // ✅ Changed
      colorBgElevated: "#24292E",   // ✅ Changed
      colorText: "#ffffff",
      colorTextPlaceholder: "#9CA3AF",
      colorBorder: "#4B5563",
    },

    // ✅ Checkbox Component - Updated bg color
    Checkbox: {
      colorBgContainer: "#24292E",  // ✅ Changed
      colorBorder: "#4B5563",
    },

    // ✅ Radio Component - Updated bg color
    Radio: {
      colorBgContainer: "#24292E",  // ✅ Changed
      colorBorder: "#4B5563",
    },

    // ✅ Upload Component - Updated bg color
    Upload: {
      colorBgContainer: "#24292E",  // ✅ Changed
      colorBorder: "#4B5563",
    },

    // ... rest of the components same as before ...
  },
};

// ✅ Simple function - returns original or dark theme
export const getAntdTheme = (isDarkMode: boolean): ThemeConfig => {
  return isDarkMode ? darkTheme : mainTheme;
};