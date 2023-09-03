import { useMutation, useQuery } from '@apollo/client';
import { deleteRichTextDocument, getDocumentList } from '@operations/document';
import { Document } from '@schema/types';
import { Spin, List, Skeleton, Modal } from 'antd';
import { useState } from 'react';

const DocumentList = (): JSX.Element => {
  const { data, loading } = useQuery(getDocumentList);

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);

  const [itemToDelete, setItemToDelete] = useState<Document>();

  const [deleteRTDocument, { loading: loadingDeleteDoc }] = useMutation(
    deleteRichTextDocument,
    {
      refetchQueries: [{ query: getDocumentList }],
      onCompleted: () => {
        setIsDeleteConfirmationModalOpen(false);
      }
    }
  );

  if (loading && !data) {
    return (
      <div className="my-40">
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  const documentList = data.documentList.map((doc: Document) => ({
    ...doc,
    updatedAt: new Date(doc.updatedAt || doc.createdAt).toDateString()
  }));

  return (
    <div className="mx-10 px-10">
      <Modal
        title={`Confirm deleting '${itemToDelete?.title}'`}
        open={isDeleteConfirmationModalOpen}
        confirmLoading={loadingDeleteDoc}
        onOk={async () => {
          await deleteRTDocument({
            variables: { documentId: itemToDelete?.id }
          });
        }}
        onCancel={() => {
          setIsDeleteConfirmationModalOpen(false);
          setItemToDelete(undefined);
        }}
        okText={'Delete'}
      >{`Are you sure you want to delete '${itemToDelete?.title}', this action cannot be un-done!`}</Modal>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={documentList}
        renderItem={(item: Document) => (
          <List.Item
            actions={[
              <a href={`/documents/${item.id}`}>edit</a>,
              <a>share</a>,
              <a
                className="text-red-600"
                onClick={() => {
                  setItemToDelete(item);
                  setIsDeleteConfirmationModalOpen(true);
                }}
              >
                delete
              </a>
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                title={<a href={`/documents/${item.id}`}>{item.title}</a>}
                description={`Last updated on ${item.updatedAt}`}
              />
              <div>{`Created by: ${item.createdBy}`}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default DocumentList;
