import { Check, Eye } from "lucide-react";
import { Card } from "@/components/Card";

export const RolesMatrixTable = () => {
  const roles = ["Owner", "Approver", "Preparer", "Auditor"];
  const actions = [
    { 
      name: "Create KYC draft",
      permissions: { Owner: "check", Approver: null, Preparer: "check", Auditor: null }
    },
    { 
      name: "Approve KYC",
      permissions: { Owner: "check", Approver: "check", Preparer: null, Auditor: null }
    },
    { 
      name: "Initiate funding instruction",
      permissions: { Owner: "check", Approver: null, Preparer: "check", Auditor: null }
    },
    { 
      name: "Approve orders",
      permissions: { Owner: "check", Approver: "check", Preparer: null, Auditor: null }
    },
    { 
      name: "View reports",
      permissions: { Owner: "check", Approver: "check", Preparer: "check", Auditor: "view" }
    },
  ];

  return (
    <Card variant="elevated" className="p-6">
      <h3 className="font-semibold text-text mb-4 font-display">Roles Matrix</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-3 font-medium text-text">Action</th>
              {roles.map((role) => (
                <th key={role} className="text-center pb-3 px-2 font-medium text-text">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {actions.map((action, index) => (
              <tr key={index} className="border-b border-border/50">
                <td className="py-3 text-text">{action.name}</td>
                {roles.map((role) => (
                  <td key={role} className="py-3 text-center px-2">
                    {action.permissions[role as keyof typeof action.permissions] === "check" && (
                      <Check className="w-4 h-4 text-success mx-auto" />
                    )}
                    {action.permissions[role as keyof typeof action.permissions] === "view" && (
                      <Eye className="w-4 h-4 text-muted mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="text-xs text-muted mt-4">
        Custom roles/thresholds available on Enterprise.
      </p>
    </Card>
  );
};