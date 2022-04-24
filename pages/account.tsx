import React from "react";
import Card from "../lib/components/common/AuthCard";
import Input from "../lib/components/common/Input";
import DashLayout from "../lib/components/DashLayout";
import UpdateProfileForm from "../lib/components/UpdateProfileForm";
import { useAuth } from "../lib/context";

const AccountsPage = () => {
  return (
    <DashLayout>
      <div className="max-w-md m-auto px-5 py-3">
        <UpdateProfileForm buttonText="Update" />
      </div>
    </DashLayout>
  );
};

export default AccountsPage;
