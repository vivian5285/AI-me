import React from 'react';
import QRCode from 'qrcode.react';

function InviteLink({ walletAddress }) {
  const inviteLink = `https://yourapp.com/invite?ref=${walletAddress}`;

  return (
    <div>
      <h2>邀请好友</h2>
      <p>您的邀请链接: <a href={inviteLink}>{inviteLink}</a></p>
      <QRCode value={inviteLink} size={128} />
      <p>扫描二维码邀请好友加入！</p>
    </div>
  );
}

export default InviteLink; 