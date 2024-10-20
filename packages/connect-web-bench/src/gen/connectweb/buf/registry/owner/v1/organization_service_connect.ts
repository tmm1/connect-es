// Copyright 2021-2024 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// @generated by protoc-gen-connect-es v1.5.0 with parameter "ts_nocheck=false,target=ts"
// @generated from file buf/registry/owner/v1/organization_service.proto (package buf.registry.owner.v1, syntax proto3)
/* eslint-disable */

import { CreateOrganizationsRequest, CreateOrganizationsResponse, DeleteOrganizationsRequest, DeleteOrganizationsResponse, GetOrganizationsRequest, GetOrganizationsResponse, ListOrganizationsRequest, ListOrganizationsResponse, UpdateOrganizationsRequest, UpdateOrganizationsResponse } from "./organization_service_pb.js";
import { MethodIdempotency, MethodKind } from "@bufbuild/protobuf";

/**
 * Operate on Organizations
 *
 * @generated from service buf.registry.owner.v1.OrganizationService
 */
export const OrganizationService = {
  typeName: "buf.registry.owner.v1.OrganizationService",
  methods: {
    /**
     * Get Organizations by id or name.
     *
     * @generated from rpc buf.registry.owner.v1.OrganizationService.GetOrganizations
     */
    getOrganizations: {
      name: "GetOrganizations",
      I: GetOrganizationsRequest,
      O: GetOrganizationsResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * List Organizations, usually by User.
     *
     * @generated from rpc buf.registry.owner.v1.OrganizationService.ListOrganizations
     */
    listOrganizations: {
      name: "ListOrganizations",
      I: ListOrganizationsRequest,
      O: ListOrganizationsResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * Create new Organizations.
     *
     * This operation is atomic. Either all Organizations are created or an error is returned.
     *
     * @generated from rpc buf.registry.owner.v1.OrganizationService.CreateOrganizations
     */
    createOrganizations: {
      name: "CreateOrganizations",
      I: CreateOrganizationsRequest,
      O: CreateOrganizationsResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.Idempotent,
    },
    /**
     * Update existing organizations.
     *
     * This operation is atomic. Either all Organizations are updated or an error is returned.
     *
     * @generated from rpc buf.registry.owner.v1.OrganizationService.UpdateOrganizations
     */
    updateOrganizations: {
      name: "UpdateOrganizations",
      I: UpdateOrganizationsRequest,
      O: UpdateOrganizationsResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.Idempotent,
    },
    /**
     * Delete existing organizations.
     *
     * This operation is atomic. Either all Organizations are deleted or an error is returned.
     *
     * @generated from rpc buf.registry.owner.v1.OrganizationService.DeleteOrganizations
     */
    deleteOrganizations: {
      name: "DeleteOrganizations",
      I: DeleteOrganizationsRequest,
      O: DeleteOrganizationsResponse,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.Idempotent,
    },
  }
} as const;

