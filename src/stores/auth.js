import { defineStore, acceptHMRUpdate  } from "pinia"
import axiosInstance from "@/services/AxiosService"
export const useAuth = defineStore('auth', {
    state: () => ({
        user: {},
        loading: false,
    }),
    persist: {
        paths: ['user']
    },
    actions: {

        async login(formData) {
            try {
                const res = await axiosInstance.post("/user/login", formData)


                if (res.status === 200) {
                    // console.log(res.data);
                    // this.user = res.data
                    return new Promise((resolve) => {
                        resolve(res.data)
                    })
                }

            }
            catch (error) {
                if (error.response.data) {
                    // this.errors= error.response.data.errors;
                    console.log(error)

                    return new Promise((reject) => {
                        reject(error = error.response.data.errors)
                    })
                }
            }

        },
        async register(formData) {
            try {
                const res = await axiosInstance.post("/user/register", formData)


                if (res.status === 201) {
                    // console.log(res.data);
                    // this.user = res.data
                    return new Promise((resolve) => {
                        resolve(res.data)
                    })
                }

            }
            catch (error) {
                if (error.response.data) {
                    // this.errors= error.response.data.errors;
                    // console.log(error)

                    return new Promise((reject) => {
                        reject(error = error.response.data.errors)
                    })
                }
            }

        },

        async logout() {
            this.loading = true;
            try {
                const res = await axiosInstance.post("/user/logout");
                if (res.status === 200) {
                    this.user = {}
                    return new Promise((resolve) => {
                        resolve(res.data)
                    })
                }
            } catch (error) {

            } finally {
                this.loading = false;
            }
        },

    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}


