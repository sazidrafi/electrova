// "use client";
// import { Switch } from "@heroui/react";
// import { useTheme } from "next-themes";
// import { Moon, Sun } from "@gravity-ui/icons";

// export function ThemeSwitch() {
//   const { theme, setTheme } = useTheme();

//   const icons = {
//     darkMode: {
//       off: Moon,
//       on: Sun,
//       selectedControlClass: "",
//     },
//   };
//   return (
//     <div>
//       {Object.entries(icons).map(([key, value]) => (
//         <Switch
//           key={key}
//           defaultSelected
//           aria-label={key}
//           size="lg"
//           isSelected={theme === "dark"}
//           onChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
//         >
//           {({ isSelected }) => (
//             <Switch.Content>
//               <Switch.Control
//                 className={
//                   theme === "dark"
//                     ? "bg-gray-600 border-2"
//                     : "bg-white border-2"
//                 }
//               >
//                 <Switch.Thumb>
//                   <Switch.Icon>
//                     {isSelected ? (
//                       <value.off className="size-3 text-inherit opacity-70" />
//                     ) : (
//                       <value.on className="size-3 text-inherit opacity-100" />
//                     )}
//                   </Switch.Icon>
//                 </Switch.Thumb>
//               </Switch.Control>
//               {theme === "dark" ? "Light" : "Dark"} Mode
//             </Switch.Content>
//           )}
//         </Switch>
//       ))}
//     </div>
//   );
// }



"use client";

import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}




