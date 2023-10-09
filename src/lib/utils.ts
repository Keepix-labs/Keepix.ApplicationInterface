import { APIState } from "@/context/api/APIProvider";
import { Dispatch, SetStateAction } from "react";

export const getErrorMsg = (e: unknown) => {
  if (typeof e === "string") {
    return e;
  }

  if (e instanceof Error) {
    return e.message;
  }

  return "Error";
};

export const safeFetch = async (
  url: string,
  setAPIState: Dispatch<SetStateAction<APIState | null>>
) => {
  let res = new Response();
  try {
    res = await fetch(url, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    setAPIState("WAITING");
    await new Promise((r) => setTimeout(r, 3000));

    try {
      res = await fetch(url);
    } catch (error) {
      setAPIState("UNREACHABLE");
      throw new Error("API not reachable");
    }
  }

  setAPIState("UP");

  return res;
};
