import AdminNav from "@/components/adminpagescomponent/nav/AdminNav";
import AnalyticHeader from "@/components/adminpagescomponent/rightside/analytics/AnalyticHeader";
import CompletionTrend from "@/components/adminpagescomponent/rightside/analytics/completiontrend/CompletionTrend";
import Distribution from "@/components/adminpagescomponent/rightside/analytics/distribution/Distribution";
import OverView from "@/components/adminpagescomponent/rightside/analytics/overview/OverView";
import Performance from "@/components/adminpagescomponent/rightside/analytics/Performance/Performance";

export default function Analytics() {
    return (
        <div className="w-full h-full bg-[#11131D]">
            <AdminNav />
            <AnalyticHeader />
            <CompletionTrend />
            <Distribution />
            <Performance />
            <OverView />
        </div>
    )
}