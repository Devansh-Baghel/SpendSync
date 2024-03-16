import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

function TransactionSkeleton() {
  return (
    <TableBody>
      {[1, 2, 3, 4, 5].map((key) => (
        <TableRow key={key}>
          <TableCell>
            <Skeleton className="h-6 rounded-xl"></Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 rounded-xl"></Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 rounded-xl"></Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 rounded-xl"></Skeleton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TransactionSkeleton;
