import axiosInst from '@/plugins/axios';

import type { AxiosResponse } from 'axios';

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description send the GET HTTP request
   * @param url: string
   * @returns Promise<AxiosResponse>
   */

  public static get(url: string): Promise<AxiosResponse> {
    return axiosInst.get(url, { timeout: 2000 });
  }

  /**
   * @description set the POST HTTP request
   * @param url: string
   * @param params: Object
   * @returns Promise<AxiosResponse>
   */

  public static post(
    url: string,
    params: Record<string, any>
  ): Promise<AxiosResponse> {
    return axiosInst.post(url, params);
  }
}

export default ApiService;
