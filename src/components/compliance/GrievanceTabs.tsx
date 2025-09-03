import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GrievanceForm } from "./GrievanceForm";
import { GrievanceStatus } from "./GrievanceStatus";

export const GrievanceTabs = () => {
  const [activeTab, setActiveTab] = useState("submit");
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const handleTicketSubmitted = (ticketId: string) => {
    setSubmittedTicketId(ticketId);
    setActiveTab("status");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submit">Submit</TabsTrigger>
          <TabsTrigger value="status">Check Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="mt-8">
          <GrievanceForm onTicketSubmitted={handleTicketSubmitted} />
        </TabsContent>
        
        <TabsContent value="status" className="mt-8">
          <GrievanceStatus prefilledTicketId={submittedTicketId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};