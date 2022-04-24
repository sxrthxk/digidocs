import React from "react";
import Card from "../lib/components/common/AuthCard";
import Layout from "../lib/components/Layout";
import UpdateProfileForm from "../lib/components/UpdateProfileForm";

const UpdateProfilePage = () => {
  return (
    <Layout authRequired>
      <Card>
        <div className="p-3">
          <UpdateProfileForm />
        </div>
      </Card>
    </Layout>
  );
};

export default UpdateProfilePage;
