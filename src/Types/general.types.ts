export type TApiResponse<T> =
  | { status: number; data: { success: true; data: T; message: string } }
  | { status: number; data: { success: false; message: string } };
