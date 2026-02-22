// "use server"

// import config from "@/config";

// export const registerUser = async (formData: FormData) => {
//     try {

//         console.log("Register data in registerUser ", formData)

//         const res = await fetch(`${config.baseUrl}/user/create-user`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: formData,
//         });

//         const result = await res.json();
//         return result;
//     } catch (error) {
//         console.error(error);
//         return { success: false, message: "Registration failed" };
//     }
// };


"use server"

import config from "@/config";

export const registerUser = async (formData: FormData) => {
  try {
    // ✅ FormData → plain object
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`${config.baseUrl}/user/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    return { success: false, message: "Registration failed" };
  }
};
