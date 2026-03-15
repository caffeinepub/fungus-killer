import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetOrders, useIsAdmin } from "@/hooks/useQueries";
import {
  AlertCircle,
  IndianRupee,
  Loader2,
  LogIn,
  LogOut,
  Package,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";

export default function AdminPanel() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const { data: orders, isLoading: ordersLoading } = useGetOrders();

  const totalRevenue = orders
    ? orders.reduce((sum, o) => sum + Number(o.quantity) * 149, 0)
    : 0;

  const formatDate = (timestamp: bigint) =>
    new Date(Number(timestamp / 1000000n)).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-admin-bg">
      {/* Header */}
      <header className="bg-admin-surface border-b border-admin-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-admin-fg text-lg leading-none">
                Fungus Killer
              </h1>
              <p className="text-admin-muted text-xs">Admin Panel</p>
            </div>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              data-ocid="admin.secondary_button"
              onClick={clear}
              className="flex items-center gap-2 text-sm text-admin-muted hover:text-admin-fg transition-colors px-3 py-1.5 rounded-lg hover:bg-admin-border"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Not authenticated */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
          >
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-display text-3xl font-bold text-admin-fg">
                Admin Login
              </h2>
              <p className="text-admin-muted max-w-sm">
                Internet Identity से login करें और सभी orders देखें।
              </p>
            </div>
            <Button
              data-ocid="admin.primary_button"
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-2xl text-base font-semibold"
            >
              {isLoggingIn ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {isLoggingIn ? "Logging in..." : "Login with Internet Identity"}
            </Button>
          </motion.div>
        )}

        {/* Authenticated but checking admin */}
        {isAuthenticated && isAdminLoading && (
          <div
            data-ocid="admin.loading_state"
            className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
          >
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-admin-muted">Verifying admin access...</p>
          </div>
        )}

        {/* Not admin */}
        {isAuthenticated && !isAdminLoading && isAdmin === false && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] gap-5"
          >
            <div
              data-ocid="admin.error_state"
              className="text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="font-display text-2xl font-bold text-admin-fg">
                Access Denied
              </h2>
              <p className="text-admin-muted">आपके पास admin access नहीं है।</p>
            </div>
            <Button
              variant="outline"
              data-ocid="admin.secondary_button"
              onClick={clear}
              className="border-admin-border text-admin-muted hover:text-admin-fg"
            >
              दूसरे account से login करें
            </Button>
          </motion.div>
        )}

        {/* Admin dashboard */}
        {isAuthenticated && !isAdminLoading && isAdmin === true && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-admin-surface rounded-2xl p-6 border border-admin-border flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-admin-muted text-sm">कुल ऑर्डर</p>
                  <p className="text-admin-fg font-bold text-3xl font-display">
                    {ordersLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin inline" />
                    ) : (
                      (orders?.length ?? 0)
                    )}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-admin-surface rounded-2xl p-6 border border-admin-border flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-admin-muted text-sm">कुल Revenue</p>
                  <p className="text-admin-fg font-bold text-3xl font-display">
                    {ordersLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin inline" />
                    ) : (
                      `₹${totalRevenue.toLocaleString("en-IN")}`
                    )}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Orders table */}
            <div className="bg-admin-surface rounded-2xl border border-admin-border overflow-hidden">
              <div className="px-6 py-4 border-b border-admin-border flex items-center gap-3">
                <Package className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-admin-fg text-xl">
                  सभी ऑर्डर
                </h2>
              </div>

              {ordersLoading ? (
                <div
                  data-ocid="admin.loading_state"
                  className="flex items-center justify-center py-16 gap-3"
                >
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="text-admin-muted">
                    Orders load हो रहे हैं...
                  </span>
                </div>
              ) : !orders || orders.length === 0 ? (
                <div
                  data-ocid="admin.empty_state"
                  className="flex flex-col items-center justify-center py-16 gap-3"
                >
                  <ShoppingBag className="w-10 h-10 text-admin-muted" />
                  <p className="text-admin-muted">अभी तक कोई ऑर्डर नहीं आया।</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow className="border-admin-border hover:bg-transparent">
                        <TableHead className="text-admin-muted font-semibold w-12">
                          #
                        </TableHead>
                        <TableHead className="text-admin-muted font-semibold">
                          नाम (Name)
                        </TableHead>
                        <TableHead className="text-admin-muted font-semibold">
                          मोबाइल (Mobile)
                        </TableHead>
                        <TableHead className="text-admin-muted font-semibold">
                          पता (Address)
                        </TableHead>
                        <TableHead className="text-admin-muted font-semibold">
                          शहर (City)
                        </TableHead>
                        <TableHead className="text-admin-muted font-semibold">
                          Pincode
                        </TableHead>
                        <TableHead className="text-admin-muted font-semibold text-right">
                          मात्रा
                        </TableHead>
                        <TableHead className="text-admin-muted font-semibold text-right">
                          Total
                        </TableHead>
                        <TableHead className="text-admin-muted font-semibold">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, idx) => (
                        <TableRow
                          key={`${order.name}-${order.mobile}-${idx}`}
                          data-ocid={`admin.order.row.${idx + 1}`}
                          className="border-admin-border hover:bg-admin-bg/50 transition-colors"
                        >
                          <TableCell className="text-admin-muted font-mono text-sm">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="text-admin-fg font-medium">
                            {order.name}
                          </TableCell>
                          <TableCell className="text-admin-fg font-mono">
                            {order.mobile}
                          </TableCell>
                          <TableCell className="text-admin-muted max-w-xs">
                            {order.address}
                          </TableCell>
                          <TableCell className="text-admin-fg">
                            {order.city}
                          </TableCell>
                          <TableCell className="text-admin-fg font-mono">
                            {order.pincode}
                          </TableCell>
                          <TableCell className="text-admin-fg text-right font-semibold">
                            {Number(order.quantity)}
                          </TableCell>
                          <TableCell className="text-green-600 font-bold text-right">
                            ₹
                            {(Number(order.quantity) * 149).toLocaleString(
                              "en-IN",
                            )}
                          </TableCell>
                          <TableCell className="text-admin-muted text-sm whitespace-nowrap">
                            {formatDate(order.timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
