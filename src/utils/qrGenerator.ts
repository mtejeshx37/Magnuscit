export interface GoogleFormData {
    "Timestamp"?: string;
    "Email Address": string;
    "Full Name": string;
    "Registration Number": string;
    "Department"?: string;
    "Year"?: string;
    "College Name"?: string;
    "Phone Number"?: string;
}

// Keep the old interface for backward compatibility if needed, 
// but the new Admin tool uses GoogleFormData
export interface UserData {
    id: string;
    name: string;
    email: string;
}

export const generateQRData = (user: GoogleFormData | UserData): string => {
    // Determine which type it is
    const id = 'Registration Number' in user ? user["Registration Number"] : user.id;
    const name = 'Full Name' in user ? user["Full Name"] : user.name;
    const email = 'Email Address' in user ? user["Email Address"] : user.email;

    const payload = {
        app: "MAGNUS 2026",
        action: "CHECK_IN",
        user: {
            id,
            name,
            email,
            // Include extra metadata if it's the full form data
            details: 'College Name' in user ? {
                college: user["College Name"],
                dept: user["Department"],
                year: user["Year"]
            } : undefined
        },
        timestamp: new Date().toISOString()
    };
    return JSON.stringify(payload);
};
