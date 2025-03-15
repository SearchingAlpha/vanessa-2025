// app/api/auth/route.js

export async function POST(request) {
    try {
      const { username, password } = await request.json();
      
      // Replace these with the actual values you want to use
      // These would typically be stored more securely (environment variables)
      const CORRECT_USERNAME = "Guapita"; // Replace with your girlfriend's name
      const CORRECT_PASSWORD = "11132024"; // Replace with your meeting date in MMDDYYYY format
      
      if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
        // Set a simple session cookie
        const response = Response.json({ success: true });
        response.headers.set('Set-Cookie', 'authenticated=true; Path=/; HttpOnly; SameSite=Strict; Max-Age=7200');
        return response;
      } else {
        // Return error for incorrect credentials
        return Response.json(
          { success: false, message: "Oops! Try again, sweetie!" },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('Auth error:', error);
      return Response.json(
        { success: false, message: "Something went wrong!" },
        { status: 500 }
      );
    }
  }