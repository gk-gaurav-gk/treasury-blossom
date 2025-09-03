import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PartnerClientsTable } from "./PartnerClientsTable";
import { PartnerPayoutsTable } from "./PartnerPayoutsTable";
import { PartnerAssets } from "./PartnerAssets";

export const PartnerTabs = () => {
  return (
    <Tabs defaultValue="clients" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="clients">Clients</TabsTrigger>
        <TabsTrigger value="payouts">Payouts</TabsTrigger>
        <TabsTrigger value="assets">Assets</TabsTrigger>
      </TabsList>
      
      <TabsContent value="clients">
        <PartnerClientsTable />
      </TabsContent>
      
      <TabsContent value="payouts">
        <PartnerPayoutsTable />
      </TabsContent>
      
      <TabsContent value="assets">
        <PartnerAssets />
      </TabsContent>
    </Tabs>
  );
};