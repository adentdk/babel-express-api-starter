function App() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center h-screen bg-gray-50">
      <div className="shadow-2xl rounded-xl p-5 bg-white w-1/3">
        <h3 className="text-2xl font-light text-blue-700 text-center mb-4">Login</h3>

        <p className="text-base font-extralight text-gray-700 text-center">Login to your account to start chatting</p>

        <form className="mt-8">
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-600">Username</label>
            <input type="text" id="username" placeholder="Input your username" className="bg-gray-100 text-gray-700 py-2 px-4 w-full focus:outline-1 focus:outline-blue-400" />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-gray-600">Password</label>
            <input type="password" id="password" placeholder="Input your Password" className="bg-gray-100 text-gray-700 py-2 px-4 w-full focus:outline-1 focus:outline-blue-400" />
          </div>

          <button className="bg-blue-700 p-2 w-full text-white rounded-lg">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default App;
