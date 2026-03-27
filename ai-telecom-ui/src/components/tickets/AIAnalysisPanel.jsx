import { Box, Typography, Paper, Chip, Divider, Button, LinearProgress, Alert } from '@mui/material';
import { CheckCircle, Cancel, Psychology, Speed, TrendingUp } from '@mui/icons-material';
import { aiAnalysisDetails } from '../../data/mockData';
import { getConfidenceColor } from '../../utils/helpers';

const AIAnalysisPanel = ({ ticket, onApprove, onReject }) => {
  if (!ticket) {
    return (
      <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">
          Select a ticket to view AI analysis
        </Typography>
      </Paper>
    );
  }

  const analysis = aiAnalysisDetails[ticket.id];
  const confidenceColor = getConfidenceColor(ticket.aiConfidence);

  if (!analysis) {
    return (
      <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Psychology color="primary" sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h6" fontWeight={600}>
              AI Analysis
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Processing ticket data...
            </Typography>
          </Box>
        </Box>
        
        <Box mb={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            AI is analyzing this ticket
          </Typography>
          <LinearProgress />
        </Box>

        <Alert severity="info">
          Analysis will be available shortly. Estimated time: 30-60 seconds
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        height: '100%',
        maxHeight: 'calc(100vh - 150px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '4px',
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Psychology color="primary" sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h6" fontWeight={600}>
              AI Analysis
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Completed in {analysis.processingTime}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={`${ticket.aiConfidence}% Confidence`}
          color={confidenceColor}
          icon={<Speed />}
          sx={{ fontWeight: 600 }}
        />
      </Box>

      {/* Root Cause */}
      <Box mb={3}>
        <Typography variant="subtitle2" fontWeight={600} color="text.secondary" gutterBottom>
          Root Cause Analysis
        </Typography>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            bgcolor: 'background.default',
            borderColor: 'primary.main',
            borderWidth: 2,
          }}
        >
          <Typography variant="body2">
            {analysis.rootCause}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Impact Analysis */}
      <Box mb={3}>
        <Typography variant="subtitle2" fontWeight={600} color="text.secondary" gutterBottom>
          Impact Analysis
        </Typography>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Severity
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {analysis.impactAnalysis.severity}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Scope
            </Typography>
            <Typography variant="body2">
              {analysis.impactAnalysis.scope}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Business Impact
            </Typography>
            <Typography variant="body2">
              {analysis.impactAnalysis.businessImpact}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              SLA Risk
            </Typography>
            <Typography 
              variant="body2" 
              fontWeight={600}
              color={analysis.impactAnalysis.slaRisk.includes('Critical') ? 'error.main' : 
                     analysis.impactAnalysis.slaRisk.includes('High') ? 'warning.main' : 'info.main'}
            >
              {analysis.impactAnalysis.slaRisk}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Technical Details */}
      <Box mb={3}>
        <Typography variant="subtitle2" fontWeight={600} color="text.secondary" gutterBottom>
          Technical Details
        </Typography>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Affected Services
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
              {analysis.technicalDetails.affectedServices.map((service) => (
                <Chip key={service} label={service} size="small" />
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Network Elements
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
              {analysis.technicalDetails.networkElements.map((element) => (
                <Chip key={element} label={element} size="small" color="info" variant="outlined" />
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Active Alarms
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
              {analysis.technicalDetails.alarms.map((alarm) => (
                <Chip key={alarm} label={alarm} size="small" color="error" variant="outlined" />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Recommended Actions */}
      <Box mb={3}>
        <Typography variant="subtitle2" fontWeight={600} color="text.secondary" gutterBottom>
          Recommended Actions
        </Typography>
        <Box display="flex" flexDirection="column" gap={1.5}>
          {analysis.recommendedActions.map((action, index) => (
            <Paper 
              key={index}
              variant="outlined" 
              sx={{ 
                p: 2,
                borderLeft: '4px solid',
                borderLeftColor: action.priority === 1 ? 'error.main' : 
                                 action.priority === 2 ? 'warning.main' : 'info.main',
              }}
            >
              <Box display="flex" alignItems="flex-start" gap={1} mb={0.5}>
                <Chip 
                  label={`Priority ${action.priority}`} 
                  size="small" 
                  color={action.priority === 1 ? 'error' : action.priority === 2 ? 'warning' : 'info'}
                />
                <Typography variant="caption" color="text.secondary">
                  Est. {action.estimatedTime}
                </Typography>
              </Box>
              <Typography variant="body2">
                {action.action}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Similar Incidents */}
      <Box mb={3}>
        <Typography variant="subtitle2" fontWeight={600} color="text.secondary" gutterBottom>
          Similar Past Incidents
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          {analysis.similarIncidents.map((incident) => (
            <Paper key={incident.id} variant="outlined" sx={{ p: 1.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {incident.id}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {incident.resolution}
                  </Typography>
                </Box>
                <Chip label={incident.time} size="small" color="success" />
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Action Buttons */}
      {ticket.status === 'pending_approval' && (
        <>
          <Divider sx={{ my: 3 }} />
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              fullWidth
              onClick={onApprove}
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              Approve Recommendation
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              fullWidth
              onClick={onReject}
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              Reject
            </Button>
          </Box>
        </>
      )}

      {ticket.status === 'ai_approved' && (
        <Alert severity="success" sx={{ mt: 2 }}>
          <strong>AI Approved:</strong> Recommendation has been validated and approved for implementation.
        </Alert>
      )}

      {ticket.status === 'ai_rejected' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <strong>AI Rejected:</strong> Recommendation requires manual review before implementation.
        </Alert>
      )}
    </Paper>
  );
};

export default AIAnalysisPanel;
