"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { Grid } from "@mui/system";
import * as Icons from "@mui/icons-material";

const formatShortDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US");
};

const StatCard = ({ label, value, subValue, icon: Icon }: { label: string; value: string | number; subValue?: string; icon: any }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Typography variant="body2" color="text.secondary" fontWeight={600}>{label}</Typography>
      <Box sx={{ color: 'primary.main', opacity: 0.8 }}><Icon /></Box>
    </Stack>
    <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>{value}</Typography>
    {subValue && <Typography variant="caption" color="text.secondary">{subValue}</Typography>}
  </Paper>
);

export default function SpacesView({ data }: { data: any }) {
  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* اسم المساحة المضاف */}
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 800, color: '#1e293b' }}>
        {data.spaceName}
      </Typography>

      {/* القسم العلوي: الكروت الاحترافية */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard label="عدد العمليات" value={data.operationsCount} subValue="إجمالي عدد العمليات المسجلة" icon={Icons.Analytics} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard label="إجمالي المصروفات" value={`${data.totalExpenses} ${data.currencySymbol}`} subValue={`العملة: ${data.currencyName}`} icon={Icons.AccountBalanceWallet} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard label="عدد الأعضاء" value={data.membersCount} subValue="إجمالي الأعضاء في المساحة" icon={Icons.Group} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <StatCard label="تاريخ الإنشاء" value={formatShortDate(data.creationTime)} icon={Icons.EventNote} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <StatCard label="آخر نشاط" value={formatShortDate(data.lastActivityDate)} icon={Icons.History} />
        </Grid>
      </Grid>

      {/* القسم السفلي: الجدول */}
      <Card sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>بيانات الأعضاء</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                  <TableCell>الاسم</TableCell>
                  <TableCell>البريد الإلكتروني</TableCell>
                  <TableCell>الهاتف</TableCell>
                  <TableCell>الصلاحيات</TableCell>
                  <TableCell>الحالة</TableCell>
                  <TableCell>تاريخ الانضمام</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.members.map((m: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem' }}>{m.name[0]}</Avatar>
                        {m.name}
                      </Stack>
                    </TableCell>
                    <TableCell>{m.email}</TableCell>
                    <TableCell>{m.phoneNumber}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5}>
                        {m.isManager && <Chip label="مدير" size="small" color="primary" />}
                        {m.isAnonymous && <Chip label="مجهول" size="small" variant="outlined" />}
                      </Stack>
                    </TableCell>
                    <TableCell><Chip label={m.status} size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }} /></TableCell>
                    <TableCell>{formatShortDate(m.joinedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}