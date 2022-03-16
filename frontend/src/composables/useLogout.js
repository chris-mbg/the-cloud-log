const useLogout = () => {
  window.localStorage.removeItem("access-token")
  window.localStorage.removeItem("currentUser")
}

export default useLogout
