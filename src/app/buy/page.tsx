import { redirect } from "next/navigation";

export default function BuyPage() {
  redirect("/search?type=SALE");
}
