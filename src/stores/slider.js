import {defineStore} from "pinia"
import axiosInstance from "@/services/AxiosService"
export const useSlider = defineStore('slider', {
    state: () => ({
        sliders: {},
        loading: false,
    }),
    actions: {

        async getData() {
            try {
                const res = await axiosInstance.get("/sliders",)


                if (res.status === 200) {
                    // console.log(res.data);
                    this.sliders = res.data
                    return new Promise((resolve) => {
                        resolve(res.data)
                    })
                }

            }
            catch (error) {
                if (error.response.data) {
                    console.log(error.response.data)

                    // return new Promise((reject) => {
                    //     reject(error = error.response.data.errors)
                    // })
                }
            }

        },
    },
 });

